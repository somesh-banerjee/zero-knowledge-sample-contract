node .\zk-codes\build\age_ab18_js\generate_witness.js .\zk-codes\build\age_ab18_js\age_ab18.wasm .\zk-codes\input.json .\zk-codes\build\age_ab18_js\witness.wtns
snarkjs groth16 setup .\zk-codes\build\age_ab18.r1cs .\zk-codes\build\snarkjs\pot12_final.ptau .\zk-codes\build\snarkjs\age_ab18_0000.zkey  
snarkjs zkey contribute .\zk-codes\build\snarkjs\age_ab18_0000.zkey .\zk-codes\build\snarkjs\age_ab18_0001.zkey --name="Somesh" -v    
snarkjs zkey export solidityverifier .\zk-codes\build\snarkjs\age_ab18_0001.zkey .\contracts\verifier.sol          