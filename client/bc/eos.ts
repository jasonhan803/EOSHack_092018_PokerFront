import Eos from 'eosjs';

let eos;
let identity,
  currentAccount;

const networkEOS = {
  protocol: 'http',
  blockchain: 'eos',
  host: '13.59.177.32',
  port: 8888,
  chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
};

export const init = () => {
  return new Promise((res, rej) => {
    document.addEventListener('scatterLoaded', (scatterExtension) => {
      eos = scatter.eos(networkEOS, Eos, {
          httpEndpoint: `http://${networkEOS.host}:${networkEOS.port}`,
          chainId: networkEOS.chainId 
      }, 'http');

      scatter.suggestNetwork(networkEOS)
        .then(x => {
          console.log('suggest network', x);
          return scatter.getIdentity({ accounts: [networkEOS] });
        })
        .then(data => {
          identity = data;
          currentAccount = identity.accounts[0];
          console.log(data);
          
          return scatter.authenticate();
        })
        .then(result => {
          console.log('result', result);
        })
        .catch(e => {
          console.error(e);
        })
    })
  });
}