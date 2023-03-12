//only code made avaiable for reference. Not reuqired as such because the same has
//to be implemented in the remix ide and the contract needs to be deployed from
//there and then use the abi generated there after the compilation of the
//smart contract
import abi from './abi.json' assert {type: "json"}
//creating a promise as either it is resolved or rejected
const polygon = new Promise((res,rej) => {
    async function metav(){

        //to check that whether the metamask is not connected to the web browser
        if(typeof(window.ethereum) == "undefined"){
            rej("You should install metamask");
        }

        // create a new web3 instance using the injected ethereum provider
        // here the injected web3 provider is Metamask
        // you are telling the constructor to use the injected Web3 provider 
        // to interact with the Ethereum blockchain.
        let web3 = new Web3(window.ethereum);
        // create a contract instance
        let contract = new web3.eth.Contract(abi, "0x9b2aDf6f72622bb513772EEE1aE47589e5b87b70");

        //to see to which acc the metamask is connected to
        let acc = await web3.eth.requestAccounts(); //gives array of acc
        console.log("connected acc: ", acc[0]);

        //giving back the current total supply 
        let totalSupply = await contract.methods.totalSupply()
        .call({from : acc[0]}) //acc from which we are connected with
        console.log("Toal available Supply", totalSupply)

        let maxSupply = await contract.methods.maxSupply()
        .call({from : acc[0]})
        console.log("Max Supply", maxSupply)

        let ownerObjects = await contract.methods.getOwnerObjects()
        .call({from : acc[0]})
        console.log("Owner objects / NFT's", ownerObjects)

        //contract instance is already avaiable above
        web3.eth.requestAccounts().then((accs)=>{
            contract.methods.totalSupply().call({from: accs[0]})
            .then((supply)=>{
                contract.methods.getOwnerObjects().call({from: accs[0]})
                .then((data)=>{
                    res({supply: supply, nft: data})
                })
            })
        })
    }

    //calling the metav function
    metav();
})

export default polygon;