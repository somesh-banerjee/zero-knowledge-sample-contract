const { expect } = require('chai')
const { ethers } = require('hardhat')
const { groth16 } = require('snarkjs')

let verifier : any
const wasmFilePath = './zk-codes/build/age_ab18_js/age_ab18.wasm'
const finalZkeyPath = './zk-codes/build/snarkjs/age_ab18_0001.zkey'

describe('AgeVerifier', () => {
  before(async () => {
    const Verifier = await ethers.getContractFactory('Groth16Verifier')

    verifier = await Verifier.deploy()
  })

  it('Should return true if age is above 18', async () => {
    const witness = {
      age: 22
    }

    const { proof, publicSignals } = await groth16.fullProve(witness, wasmFilePath, finalZkeyPath, null)

    const transaction = await verifier.verifyProof(
        [proof.pi_a[0], proof.pi_a[1],], 
        [
        [proof.pi_b[0][1], proof.pi_b[0][0],],
        [proof.pi_b[1][1], proof.pi_b[1][0],]
      ],
      [proof.pi_c[0], proof.pi_c[1]],
        publicSignals)
        
    expect(transaction).to.be.equal(true)
  })
  
  it('Should return true if age is 18', async () => {
    const witness = {
      age: 18
    }

    const { proof, publicSignals } = await groth16.fullProve(witness, wasmFilePath, finalZkeyPath, null)

    const transaction = await verifier.verifyProof(
        [proof.pi_a[0], proof.pi_a[1],], 
        [
        [proof.pi_b[0][1], proof.pi_b[0][0],],
        [proof.pi_b[1][1], proof.pi_b[1][0],]
      ],
      [proof.pi_c[0], proof.pi_c[1]],
        publicSignals)
        
    expect(transaction).to.be.equal(true)
  })

  it('Should return false if age is below 18', async () => {
    const witness = {
      age: 16
    }

    const { proof, publicSignals } = await groth16.fullProve(witness, wasmFilePath, finalZkeyPath, null)

    const transaction = await verifier.verifyProof(
        [proof.pi_a[0], proof.pi_a[1],], 
        [
        [proof.pi_b[0][1], proof.pi_b[0][0],],
        [proof.pi_b[1][1], proof.pi_b[1][0],]
        ],
        [proof.pi_c[0], proof.pi_c[1]],
        publicSignals
    )

    expect(transaction).to.be.equal(false)
        

  })
})