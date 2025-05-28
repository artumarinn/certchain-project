// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertificateAnchor {
    struct Anchor {
        address emitter; // Quién llamó a la función para anclar
        string ipfsHash;         // El hash del certificado (o CID de IPFS)
        uint256 timestamp;       // Cuándo se ancló
    }

    // Array público para almacenar todos los anclajes (se puede consultar directamente)
    Anchor[] public anchors;

    // Evento para facilitar la indexación y el seguimiento off-chain
    event CertificateAnchored(address indexed emitter, string ipfsHash, uint256 timestamp);

    /**
     * @dev Permite a cualquier entidad anclar un hash de IPFS.
     * En tu caso, será tu backend Python quien llamará a esta función.
     * @param ipfsHash El hash del certificado o CID de IPFS a anclar.
     */
    function anchorCertificate(string memory ipfsHash) external {
        // Registra la información del anclaje
        anchors.push(Anchor(msg.sender, ipfsHash, block.timestamp));
        // Emite un evento para notificar que se ha anclado un certificado
        emit CertificateAnchored(msg.sender, ipfsHash, block.timestamp);
    }

    /**
     * @dev Retorna el número total de anclajes registrados.
     */
    function getAnchorsCount() external view returns (uint256) {
        return anchors.length;
    }

    /**
     * @dev Retorna un anclaje específico por su índice.
     * Se puede usar `anchors(index)` ya que es un array público.
     * @param index El índice del anclaje en el array.
     */
    function getAnchor(uint256 index) external view returns (address, string memory, uint256) {
        Anchor storage anchor = anchors[index];
        return (anchor.emitter, anchor.ipfsHash, anchor.timestamp);
    }
}