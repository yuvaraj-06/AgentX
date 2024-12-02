// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract TaskRegistry is ERC20, ReentrancyGuard {
    uint256 public constant INITIAL_SUPPLY = 1000000 * (10 ** 18); // 1 million tokens
    uint256 public constant TOKEN_PRICE = 0.001 ether; // 1 token = 0.001 ETH
    uint256 public constant STAKE_DURATION = 30 days;
    uint256 public constant STAKE_REWARD_RATE = 5; // 5% reward for staking

    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public stakingStart;

    // Task related structures and variables
    enum TaskType {
        AIOnly,
        HumanOnly,
        AIHuman
    }
    enum Priority {
        Low,
        Medium,
        High
    }

    struct Task {
        uint256 id;
        string title;
        string description;
        TaskType taskType;
        string[] tools;
        uint8 automationLevel;
        uint8 humanInteraction;
        uint256 duration;
        uint256 bounty;
        string expertise;
        uint8 totalSlots;
        uint8 filledSlots;
        Priority priority;
        bool isConfidential;
    }

    Task[] public tasks;
    uint256 public taskIdCounter;

    event TokensPurchased(address indexed buyer, uint256 amount);
    event TokensSold(address indexed seller, uint256 amount);
    event TokensStaked(address indexed staker, uint256 amount);
    event TokensUnstaked(address indexed staker, uint256 amount, uint256 reward);
    event TaskCreated(uint256 indexed taskId, string title);

    constructor() ERC20("CustomToken", "CTK") {
        _mint(address(this), INITIAL_SUPPLY);
        taskIdCounter = 1;
    }

    // Existing functions (buyTokens, sellTokens, stakeTokens, unstakeTokens, getStakeInfo) remain the same

    function createTask(
        string memory _title,
        string memory _description,
        TaskType _taskType,
        string[] memory _tools,
        uint8 _automationLevel,
        uint8 _humanInteraction,
        uint256 _duration,
        uint256 _bounty,
        string memory _expertise,
        uint8 _totalSlots,
        uint8 _filledSlots,
        Priority _priority,
        bool _isConfidential
    ) external returns (uint256) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(_automationLevel <= 5, "Automation level must be between 0 and 5");
        require(_humanInteraction <= 5, "Human interaction must be between 0 and 5");

        uint256 newTaskId = taskIdCounter;
        taskIdCounter++;

        Task memory newTask = Task({
            id: newTaskId,
            title: _title,
            description: _description,
            taskType: _taskType,
            tools: _tools,
            automationLevel: _automationLevel,
            humanInteraction: _humanInteraction,
            duration: _duration,
            bounty: _bounty,
            expertise: _expertise,
            totalSlots: _totalSlots,
            filledSlots: _filledSlots,
            priority: _priority,
            isConfidential: _isConfidential
        });

        tasks.push(newTask);
        emit TaskCreated(newTaskId, _title);

        return newTaskId;
    }

    function getTask(uint256 _taskId) external view returns (Task memory) {
        require(_taskId > 0 && _taskId < taskIdCounter, "Invalid task ID");
        return tasks[_taskId - 1];
    }

    // Function to allow contract to receive ETH
    receive() external payable {}
}
