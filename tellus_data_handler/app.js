const LAT_LNG_DIVIDER = 1000000;

const Web3 = require('web3');
const web3 = new Web3(process.env.WEB3_PROVIDER);

const ipfsClient = require('ipfs-http-client');

const ipfs = ipfsClient(
  process.env.IPFS_API_SERVER_URL,
  process.env.IPFS_API_SERVER_PORT
);

const RegistryEntitiesJSON = require("../tellus_services/tellus_react/src/contracts/RegistryEntities.json");

const RegistryEntitiesContract = new web3.eth.Contract(
  RegistryEntitiesJSON.abi,
  RegistryEntitiesJSON["networks"][process.env.ETHEREUM_NETWORK]["address"]
);

const data = require('./data/192072450_COMM_4C68.json');

const fields = [
  "ML Number",
  "Address",
  "Public Comments",
  "Latitude",
  "Longitude"
];

let sanitized_data = [];
fields.forEach(function (field) {
  Object.keys(data[field]).forEach( function (k) {
    k = k >> 0;
    if ( !sanitized_data[k] ) {
      sanitized_data[k] = {}
    }
    sanitized_data[k][field] = data[field][k];
  });
});

async function start_upload_data_to_tellus () {
  sanitized_data.forEach( async function(data) {
    let result;

    try {
      result = await ipfs.addFromFs(`./data/192072450_COMM_4C68/${data['ML Number']}_1.jpg`);

      let image_url = `${process.env.IPFS_GATEWAY_URL}/ipfs/${result[0].hash}`;
      let documents_url = '';
      let points = [
        Math.round(data['Latitude']*LAT_LNG_DIVIDER),
        Math.round(data['Longitude']*LAT_LNG_DIVIDER),
        0
      ];

      try {
        await RegistryEntitiesContract.methods
          .create(data['Address'], data['Public Comments'], documents_url, image_url, points)
          .send({
            from: process.env["ADMIN_ADDRESS"],
            gas: 1000000
          });
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  });
}

start_upload_data_to_tellus();