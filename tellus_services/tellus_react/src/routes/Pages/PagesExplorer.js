import React from 'react';
import { Table, Row, Col } from 'react-bootstrap';

class PagesExplorer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      transactions: []
    };
  }

  async componentDidMount () {
    let response = await fetch("http://localhost:3002/transactions");
    response = await response.json();
    let transactions = response;
    this.setState({
      transactions
    });
  }

  render () {
    return (
      <React.Fragment>
        <h2>Explorer</h2>
        <Row>
          <Col md={{span: 10, offset: 1}}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>transactionHash</th>
                  <th>blockNumber</th>
                  <th>eventName</th>
                </tr>
              </thead>
              <tbody>
              {
                this.state.transactions.map((transaction) => {
                  return (
                    <tr>
                      <td>{transaction.transactionHash}</td>
                      <td>{transaction.blockNumber}</td>
                      <td>{transaction.eventName}</td>
                    </tr>
                  )
                })
              }
              </tbody>
            </Table>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default PagesExplorer;
