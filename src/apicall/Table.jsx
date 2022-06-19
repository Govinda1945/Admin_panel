import React, {Component} from 'react';
import './style.css';

class Table extends Component{

  constructor(props){
    super(props)
    this.state = {
      users:[],
      isLoading : false,
      isError : false
    }
  }

  //async function to get request

  async componentDidMount(){
    this.setState({isLoading:true})

    const response = await fetch(" https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")

    if(response.ok){
      const users = await response.json();
      this.setState({users,isLoading:false})

    }
    else{
      this.setState({isError:true,isLoading:false})
    }
  }

  renderTableHeader = () =>{
    return Object.keys(this.state.users[0]).map(attr => <th key={attr}>
        {attr.toUpperCase()}
      </th>)
  }

  renderTableRows = () =>{
    return this.state.users.map(user => {
      return(
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
        </tr>
      )
    })
  }


  render(){
    const{users,isLoading,isError} = this.state

    if(isLoading){
      return <div>Loading...</div>
    }

    if(isError){
      return <div>Error...</div>
    }
    return users.length >0
    ?(
        <table>
          <thead>
            <tr>
              {this.renderTableHeader()}
            </tr>
          </thead>
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>
    ):(
      <div>No Users</div>
    )
  }
}

export default Table;