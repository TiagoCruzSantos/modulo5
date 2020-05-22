import React, {Component} from 'react'

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'
import { Form, SubmitButton, List } from './styles'
import Container from '../../components/Container'
import {Link} from 'react-router-dom'

import api from '../../services/api'

class Main extends Component{

    state = {
        newRepo: '',
        repositories: [],
        loading: false,
        error: false
    }

    componentDidMount(){
        const repositories = localStorage.getItem('repositories')

        if(repositories){
            this.setState({repositories: JSON.parse(repositories)})
        }
    }

    componentDidUpdate(_, prevState){
        const {repositories} = this.state

        if(prevState.repositories !== repositories){
            localStorage.setItem('repositories', JSON.stringify(repositories))
        }
    }

    hadleInputChange = e => {
        this.setState({newRepo: e.target.value})
    }

    handleSubmit = async e => {
        e.preventDefault()

        this.setState({loading: true, error: false})

        try{
            const { newRepo, repositories } = this.state

            const response = await api.get(`/repos/${newRepo}`)

            const data = response.data.full_name

            if(repositories.includes(data)){
                throw new Error('repositório duplicado')
            }

            this.setState({
                loading: false,
                repositories: [...this.state.repositories, data],
                newRepo: ''
            })
        }catch{
            this.setState({
                error: true,
                loading: false,
                newRepo: ''
            })
        }
        
    }

    render(){
        const { newRepo, loading, repositories, error } = this.state

        return (
            <Container>
                <h1>
                    <FaGithubAlt/>
                    Repositórios
                </h1>

                <Form onSubmit={this.handleSubmit} error={error}>
                    <input 
                        type='text' 
                        placeholder='Adicionar repositório'
                        value={newRepo}
                        onChange={this.hadleInputChange}></input>
                    <SubmitButton loading={loading}>
                        {loading ? <FaSpinner color='#FFF' size={14}/> : <FaPlus color='#FFF' size={14}/>}
                    </SubmitButton>
                </Form>
                <List>
                    {repositories.map(repo => (
                        <li key={repo}>
                            {repo}
                            <Link to={`/repositories/${encodeURIComponent(repo)}`}>Detalhes</Link>
                        </li>
                    ))}
                </List>
            </Container>
        )
    }
}

export default Main