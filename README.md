# Sample Zero Knowledge Proof

This project demonstrates a simple zero knowledge proof using the circom compiler and snarkjs library.

## Setup
1. Install nodejs and npm
2. Install circom to compile the circom code to a circuit
3. Install snarkjs to generate the proving and verifying keys, and to generate and verify proofs.

## Running the code
1. Compile the circuit using circom
```
circom circuit/age_ab18.circom --r1cs --wasm --sym -o build/
```
2. Generate the proving and verifying keys using snarkjs
```
snarkjs setup --protocol groth
```
3. Generate the proof using snarkjs
```
snarkjs groth16 prove circuit/age_ab18.r1cs build/age_ab18.wasm build/age_ab18.sym circuit/age_ab18_input.json proof.json
```

4. Verify the proof using snarkjs
```
snarkjs groth16 verify verification_key.json proof.json
```

## References
1. https://github.com/Elefria-Labs/zk-block
2. https://github.com/allemanfredi/zk-age-verifier/tree/main
