// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface IVerifier {
  function verifyProof(
    uint256[2] memory a,
    uint256[2][2] memory b,
    uint256[2] memory c,
    uint256[2] memory input
  ) external view returns (bool);
}

contract AgeVerifier {

    IVerifier public verifier;
    mapping(address => bool) public ageChecked;
    mapping(address => address) public approvedViewer;

    constructor(address _verifier) {
        verifier = IVerifier(_verifier);
    }

    function verifyProof(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) external {
        require(
            verifier.verifyProof(a, b, c, input),
            "Below 18 years old"
        );
        ageChecked[msg.sender] = true;
    }

    function CheckProof(address _w) external view returns (bool) {
        require(_w == msg.sender || approvedViewer[_w] == msg.sender, "Not approved to check");
        return ageChecked[_w];
    }

    function Approve(address _w) external {
        approvedViewer[msg.sender] = _w;
    }



}