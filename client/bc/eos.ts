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

export const search_game = () => {
  eos.transaction({
    actions: [
      {
        account: 'notechainacc',
        name: 'search_game',
        authorization: [{
          actor: currentAccount.name,
          permission: currentAccount.authority
        }],
        data: {}
      }
    ]
  })
}

export const start_game = (id) => {
  eos.transaction({
    actions: [
      {
        account: 'notechainacc',
        name: 'start_game',
        authorization: [{
          actor: currentAccount.name,
          permission: currentAccount.authority
        }],
        data: {
          id
        }
      }
    ]
  })
}

export const deck_shuffled = (id, cards) => {
  eos.transaction({
    actions: [
      {
        account: 'notechainacc',
        name: 'deck_shuffled',
        authorization: [{
          actor: currentAccount.name,
          permission: currentAccount.authority
        }],
        data: {
          id, cards
        }
      }
    ]
  })
}

export const deck_recrypted = (id, cards) => {
  eos.transaction({
    actions: [
      {
        account: 'notechainacc',
        name: 'deck_recrypted',
        authorization: [{
          actor: currentAccount.name,
          permission: currentAccount.authority
        }],
        data: {
          id, cards
        }
      }
    ]
  })
}


export const card_key = (id, num, key) => {
  eos.transaction({
    actions: [
      {
        account: 'notechainacc',
        name: 'card_key',
        authorization: [{
          actor: currentAccount.name,
          permission: currentAccount.authority
        }],
        data: {
          id, num, key
        }
      }
    ]
  })
}

export const check = (id) => {
  eos.transaction({
    actions: [
      {
        account: 'notechainacc',
        name: 'check',
        authorization: [{
          actor: currentAccount.name,
          permission: currentAccount.authority
        }],
        data: {
          id
        }
      }
    ]
  })
}

export const call = (id) => {
  eos.transaction({
    actions: [
      {
        account: 'notechainacc',
        name: 'call',
        authorization: [{
          actor: currentAccount.name,
          permission: currentAccount.authority
        }],
        data: {
          id
        }
      }
    ]
  })
}

export const raise = (id, sum) => {
  eos.transaction({
    actions: [
      {
        account: 'notechainacc',
        name: 'raise',
        authorization: [{
          actor: currentAccount.name,
          permission: currentAccount.authority
        }],
        data: {id, sum}
      }
    ]
  })
}

