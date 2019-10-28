import React, { Component } from 'react';
import api from '../../services/api';

class Repository extends Component {
  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);
    /*
     * Promse.all pode exutar varios promisses no mesmo tempo
     * as açoes a serem executadas, devem ser passadas em um array
     * e podem ser desestruturadas num array. ver linnha 14.
     */
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    console.log(repository);
    console.log(issues);
  }

  render() {
    return <h1>Repository</h1>;
  }
}

export default Repository;
