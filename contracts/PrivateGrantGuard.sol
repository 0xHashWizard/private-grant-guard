// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract PrivateGrantGuard is SepoliaConfig {
    using FHE for *;
    
    struct GrantApplication {
        euint32 applicationId;
        euint32 requestedAmount;
        euint32 academicScore;
        euint32 financialNeed;
        bool isSubmitted;
        bool isApproved;
        bool isDisbursed;
        string studentName;
        string institution;
        string program;
        address studentAddress;
        address verifier;
        uint256 submissionTime;
        uint256 reviewDeadline;
    }
    
    struct Disbursement {
        euint32 disbursementId;
        euint32 amount;
        address recipient;
        uint256 timestamp;
        bool isCompleted;
    }
    
    struct AcademicRecord {
        euint32 gpa;
        euint32 testScores;
        euint32 extracurriculars;
        bool isVerified;
        address verifier;
        uint256 verificationTime;
    }
    
    mapping(uint256 => GrantApplication) public applications;
    mapping(uint256 => Disbursement) public disbursements;
    mapping(address => AcademicRecord) public academicRecords;
    mapping(address => euint32) public studentReputation;
    mapping(address => euint32) public institutionReputation;
    
    uint256 public applicationCounter;
    uint256 public disbursementCounter;
    
    address public owner;
    address public treasury;
    address public verifier;
    
    event ApplicationSubmitted(uint256 indexed applicationId, address indexed student, string institution);
    event ApplicationApproved(uint256 indexed applicationId, address indexed student);
    event ApplicationRejected(uint256 indexed applicationId, address indexed student, string reason);
    event DisbursementMade(uint256 indexed disbursementId, address indexed recipient, uint32 amount);
    event AcademicRecordVerified(address indexed student, address indexed verifier);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _treasury, address _verifier) {
        owner = msg.sender;
        treasury = _treasury;
        verifier = _verifier;
    }
    
    function submitGrantApplication(
        string memory _studentName,
        string memory _institution,
        string memory _program,
        externalEuint32 _requestedAmount,
        externalEuint32 _academicScore,
        externalEuint32 _financialNeed,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_studentName).length > 0, "Student name cannot be empty");
        require(bytes(_institution).length > 0, "Institution cannot be empty");
        require(bytes(_program).length > 0, "Program cannot be empty");
        
        uint256 applicationId = applicationCounter++;
        
        // Convert external values to internal FHE values
        euint32 internalAmount = FHE.fromExternal(_requestedAmount, inputProof);
        euint32 internalScore = FHE.fromExternal(_academicScore, inputProof);
        euint32 internalNeed = FHE.fromExternal(_financialNeed, inputProof);
        
        applications[applicationId] = GrantApplication({
            applicationId: FHE.asEuint32(0), // Will be set properly later
            requestedAmount: internalAmount,
            academicScore: internalScore,
            financialNeed: internalNeed,
            isSubmitted: true,
            isApproved: false,
            isDisbursed: false,
            studentName: _studentName,
            institution: _institution,
            program: _program,
            studentAddress: msg.sender,
            verifier: address(0),
            submissionTime: block.timestamp,
            reviewDeadline: block.timestamp + 30 days
        });
        
        emit ApplicationSubmitted(applicationId, msg.sender, _institution);
        return applicationId;
    }
    
    function reviewApplication(
        uint256 applicationId,
        bool isApproved,
        string memory reason
    ) public {
        require(msg.sender == verifier, "Only verifier can review applications");
        require(applications[applicationId].studentAddress != address(0), "Application does not exist");
        require(applications[applicationId].isSubmitted, "Application not submitted");
        require(!applications[applicationId].isApproved, "Application already reviewed");
        
        applications[applicationId].isApproved = isApproved;
        applications[applicationId].verifier = msg.sender;
        
        if (isApproved) {
            emit ApplicationApproved(applicationId, applications[applicationId].studentAddress);
        } else {
            emit ApplicationRejected(applicationId, applications[applicationId].studentAddress, reason);
        }
    }
    
    function disburseGrant(
        uint256 applicationId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public {
        require(msg.sender == treasury, "Only treasury can disburse grants");
        require(applications[applicationId].isApproved, "Application must be approved");
        require(!applications[applicationId].isDisbursed, "Grant already disbursed");
        
        uint256 disbursementId = disbursementCounter++;
        
        // Convert external amount to internal FHE value
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        disbursements[disbursementId] = Disbursement({
            disbursementId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            recipient: applications[applicationId].studentAddress,
            timestamp: block.timestamp,
            isCompleted: true
        });
        
        applications[applicationId].isDisbursed = true;
        
        emit DisbursementMade(disbursementId, applications[applicationId].studentAddress, 0); // Amount will be decrypted off-chain
    }
    
    function verifyAcademicRecord(
        address student,
        externalEuint32 gpa,
        externalEuint32 testScores,
        externalEuint32 extracurriculars,
        bytes calldata inputProof
    ) public {
        require(msg.sender == verifier, "Only verifier can verify academic records");
        require(student != address(0), "Invalid student address");
        
        // Convert external values to internal FHE values
        euint32 internalGpa = FHE.fromExternal(gpa, inputProof);
        euint32 internalTestScores = FHE.fromExternal(testScores, inputProof);
        euint32 internalExtracurriculars = FHE.fromExternal(extracurriculars, inputProof);
        
        academicRecords[student] = AcademicRecord({
            gpa: internalGpa,
            testScores: internalTestScores,
            extracurriculars: internalExtracurriculars,
            isVerified: true,
            verifier: msg.sender,
            verificationTime: block.timestamp
        });
        
        emit AcademicRecordVerified(student, msg.sender);
    }
    
    function updateStudentReputation(address student, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(student != address(0), "Invalid student address");
        
        studentReputation[student] = reputation;
        emit ReputationUpdated(student, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function updateInstitutionReputation(address institution, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(institution != address(0), "Invalid institution address");
        
        institutionReputation[institution] = reputation;
        emit ReputationUpdated(institution, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getApplicationInfo(uint256 applicationId) public view returns (
        string memory studentName,
        string memory institution,
        string memory program,
        uint8 requestedAmount,
        uint8 academicScore,
        uint8 financialNeed,
        bool isSubmitted,
        bool isApproved,
        bool isDisbursed,
        address studentAddress,
        address verifier,
        uint256 submissionTime,
        uint256 reviewDeadline
    ) {
        GrantApplication storage application = applications[applicationId];
        return (
            application.studentName,
            application.institution,
            application.program,
            0, // FHE.decrypt(application.requestedAmount) - will be decrypted off-chain
            0, // FHE.decrypt(application.academicScore) - will be decrypted off-chain
            0, // FHE.decrypt(application.financialNeed) - will be decrypted off-chain
            application.isSubmitted,
            application.isApproved,
            application.isDisbursed,
            application.studentAddress,
            application.verifier,
            application.submissionTime,
            application.reviewDeadline
        );
    }
    
    function getDisbursementInfo(uint256 disbursementId) public view returns (
        uint8 amount,
        address recipient,
        uint256 timestamp,
        bool isCompleted
    ) {
        Disbursement storage disbursement = disbursements[disbursementId];
        return (
            0, // FHE.decrypt(disbursement.amount) - will be decrypted off-chain
            disbursement.recipient,
            disbursement.timestamp,
            disbursement.isCompleted
        );
    }
    
    function getAcademicRecord(address student) public view returns (
        uint8 gpa,
        uint8 testScores,
        uint8 extracurriculars,
        bool isVerified,
        address verifier,
        uint256 verificationTime
    ) {
        AcademicRecord storage record = academicRecords[student];
        return (
            0, // FHE.decrypt(record.gpa) - will be decrypted off-chain
            0, // FHE.decrypt(record.testScores) - will be decrypted off-chain
            0, // FHE.decrypt(record.extracurriculars) - will be decrypted off-chain
            record.isVerified,
            record.verifier,
            record.verificationTime
        );
    }
    
    function getStudentReputation(address student) public view returns (uint8) {
        return 0; // FHE.decrypt(studentReputation[student]) - will be decrypted off-chain
    }
    
    function getInstitutionReputation(address institution) public view returns (uint8) {
        return 0; // FHE.decrypt(institutionReputation[institution]) - will be decrypted off-chain
    }
    
    function withdrawTreasury() public {
        require(msg.sender == treasury, "Only treasury can withdraw");
        require(address(this).balance > 0, "No funds to withdraw");
        
        payable(treasury).transfer(address(this).balance);
    }
    
    receive() external payable {
        // Allow contract to receive ETH
    }
}
