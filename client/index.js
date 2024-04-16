const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';
const list = new MerkleTree(niceList);

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const name = process.argv[2] || "Juri Parladore";
  const index = niceList.findIndex(n => n === name);
  const proof = list.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    headers:{},
    body: {
      name,
      proof,
    }
  });

  console.log({ gift });
}

main();
