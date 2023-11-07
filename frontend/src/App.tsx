import { useState } from "react"
import { generateProof } from "./utils/generate_proof"

function App() {
    const [age, setAge] = useState<number | undefined>(undefined)
    const [wallet, setWallet] = useState<string | undefined>(undefined)
    

    async function handleAgeSubmit() {
        if (age === undefined) {
            alert("Please enter your age")
            return
        }
        try {
            const proof = await generateProof(age)
            console.log(proof)
        } catch (error) {
            alert("Error generating proof")
        }
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
