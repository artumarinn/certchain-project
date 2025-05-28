// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertificateAnchor {
    struct Anchor {
        address emitter;     // Who called the function to anchor
        string ipfsHash;     // The certificate hash (or IPFS CID)
        uint256 timestamp;   // When it was anchored
    }

    // Public array to store all anchors (can be queried directly)
    Anchor[] public anchors;

    // Event to facilitate off-chain indexing and tracking
    event CertificateAnchored(address indexed emitter, string ipfsHash, uint256 timestamp);

    /**
     * @dev Allows any entity to anchor an IPFS hash.
     * In your case, your Python backend will call this function.
     * @param ipfsHash The certificate hash or IPFS CID to anchor.
     */
    function anchorCertificate(string memory ipfsHash) external {
        // Records the anchor information
        anchors.push(Anchor(msg.sender, ipfsHash, block.timestamp));
        // Emits an event to notify that a certificate has been anchored
        emit CertificateAnchored(msg.sender, ipfsHash, block.timestamp);
    }

    /**
     * @dev Returns the total number of registered anchors.
     */
    function getAnchorsCount() external view returns (uint256) {
        return anchors.length;
    }

    /**
     * @dev Returns a specific anchor by its index.
     * `anchors(index)` can be used as it is a public array.
     * @param index The index of the anchor in the array.
     */
    function getAnchor(uint256 index) external view returns (address, string memory, uint256) {
        Anchor storage anchor = anchors[index];
        return (anchor.emitter, anchor.ipfsHash, anchor.timestamp);
    }
}