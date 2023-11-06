import { groth16 } from 'snarkjs';

export const generateProof = async (age: number) => {
    const witness = {
        age: age
    }
    const wasmFilePath = 'frontend/src/utils/age.wasm'
    const finalZkeyPath = 'frontend/src/utils/age.zkey'

    const { proof, publicSignals } = await groth16.fullProve(witness, wasmFilePath, finalZkeyPath, null)

    return {
        proof,
        publicSignals
    }

}

