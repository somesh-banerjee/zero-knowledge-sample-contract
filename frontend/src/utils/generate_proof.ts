import { groth16 } from 'snarkjs';

export const generateProof = async (age: number) => {
    const witness = {
        age: age
    }
    const wasmFilePath = '/age.wasm'
    const finalZkeyPath = '/age.zkey'

    try {
        const { proof, publicSignals } = await groth16.fullProve(witness, wasmFilePath, finalZkeyPath, null)
        return {
            proof,
            publicSignals
        }
    } catch (error) {
        throw error
    }

    

}

