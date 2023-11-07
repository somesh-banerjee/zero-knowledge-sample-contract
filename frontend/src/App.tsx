import { useState } from "react"
import { generateProof } from "./utils/generate_proof"
import ABI from "./utils/abi.json"
import { useConnect, useContractWrite, usePrepareContractWrite } from 'wagmi'

function App() {
    const [age, setAge] = useState<number | undefined>(undefined)
    const [wallet, setWallet] = useState<string | undefined>(undefined)
    const [snark, setSnark] = useState<any>({
        proof: {
            pi_a: [0, 0],
            pi_b: [[0, 0], [0, 0]],
            pi_c: [0, 0]
        },
        publicSignals: [0]
    })

    const { connect, connectors } = useConnect()
    const { config: prepareContractWriteConfig } = usePrepareContractWrite({
        address: "0x2B7e5A273112F54140FD0F2Af05aAEDF1Ec32053",
        abi: ABI,
        functionName: "verifyProof",
       args: [
            [snark.proof.pi_a[0], snark.proof.pi_a[1]],
            [
                [snark.proof.pi_b[0][1], snark.proof.pi_b[0][0]],
                [snark.proof.pi_b[1][1], snark.proof.pi_b[1][0]]
            ],
            [snark.proof.pi_c[0], snark.proof.pi_c[1]],
            [snark.publicSignals[0]]
        ],
    })

    const { data, write } = useContractWrite({
        ...prepareContractWriteConfig,
        onError: (error) => {
            console.log(error)
        },
        onSuccess: (result) => {
            console.log(result)
        }
    })

    // const { isLoading, isSuccess } = useWaitForTransaction({
    //     hash: data?.hash,
    // })

    
    async function handleAgeSubmit() {

        connect({connector : connectors[0]})

        if (age === undefined) {
            alert("Please enter your age")
            return
        }
        try {
            const snark_res = await generateProof(age)
            setSnark(snark_res)
        } catch (error) {
            alert("Error generating proof")
            return
        }
        write?.()
        setSnark({
            proof: {
                pi_a: [0, 0],
                pi_b: [[0, 0], [0, 0]],
                pi_c: [0, 0]
            },
            publicSignals: [0]
        })
    }

    function handleWalletSubmit(): void {
        throw new Error("Function not implemented.")
    }

  return (
    <div className="centered">
      <h1>Zero knowledge Age Verifier</h1>

      <section>
        <h2>Submitting Age (zk proofs)</h2>
        <input
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value))}
        />
        <button onClick={handleAgeSubmit}>Submit</button>
        <p></p>
      </section>

      <section>
        <h2>Check Proof</h2>
        <input
          type="text"
          placeholder="Enter wallet address to check"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />
        <button onClick={handleWalletSubmit}>Submit</button>
      </section>
    </div>
  )
}

export default App
