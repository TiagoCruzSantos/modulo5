import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import parse from 'parse-link-header'

import api from '../../services/api'
import Container from '../../components/Container'

import { Loading, Owner, IssuesList, Buttons, PageController } from './styles'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

class Repository extends Component{

    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string
            })
        }).isRequired
    }

    state = {
        repository: {},
        issues: {},
        loading: true,
        page: 1,
        previousPage: 1,
        nextPage: 1,
        lastPage: 1,
        firstPage: 1,
        state: 'open'
    }

    async componentDidMount(){
        const repoName = decodeURIComponent(this.props.match.params.repository)

        const [repository, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: 'open',
                    per_page: 5,
                    page: 1
                }
            })
        ])

        const parsedHeaderLink = parse(issues.headers.link)
        console.log(parsedHeaderLink)

        this.setState({
            repository: repository.data,
            issues: issues.data,
            loading: false,
            page: 1,
            lastPage: parseInt(parsedHeaderLink.last?.page),
            nextPage: parseInt(parsedHeaderLink.next?.page),
            firstPage: parseInt(parsedHeaderLink.first?.page),
            previousPage: parseInt(parsedHeaderLink.prev?.page)
        })
    }

    async getIssues(state){
        const repoName = decodeURIComponent(this.props.match.params.repository)

        const issues = await api.get(`repos/${repoName}/issues`, {
            params:  {
                state: state,
                per_page: 5
            }
        })

        this.setState({
            issues: issues.data,
            state: state
        })
    }

    async getPage(page){
        const repoName = decodeURIComponent(this.props.match.params.repository)

        const issues = await api.get(`repos/${repoName}/issues`, {
            params:  {
                state: this.state.state,
                per_page: 5,
                page: page
            }
        })

        const parsedHeaderLink = parse(issues.headers.link)
        console.log(parsedHeaderLink)

        this.setState({
            issues: issues.data,
            page: page,
            lastPage: parseInt(parsedHeaderLink.last?.page),
            nextPage: parseInt(parsedHeaderLink.next?.page),
            firstPage: parseInt(parsedHeaderLink.first?.page),
            previousPage: parseInt(parsedHeaderLink.prev?.page)
        })
    }

    render() {
        const {loading, repository, issues} = this.state

        if(loading){
            return <Loading>Carregando</Loading>
        }

        return (
            <Container>
                <Owner>
                    <Link to='/'>Voltar para a pagina principal</Link>
                    <img src={repository.owner.avatar_url} alt={repository.owner.login}></img>
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>

                <IssuesList>
                    <Buttons>
                        <button onClick={() => this.getIssues('open')}>Open</button>
                        <button onClick={() => this.getIssues('closed')}>Closed</button>
                        <button onClick={() => this.getIssues('all')}>All</button>
                    </Buttons>
                    {issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img src={issue.user.avatar_url} alt={issue.user.login}/>
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}>{label.name}</span>
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                    <PageController>
                        <button onClick={() => this.getPage(this.state['previousPage'])}>
                            <FaAngleLeft color='#FFF' size={40}/>
                        </button>
                        <button onClick={() => this.getPage(this.state['nextPage'])}>
                            <FaAngleRight color='#FFF' size={40}/>
                        </button>
                    </PageController>
                </IssuesList>
            </Container>
        )
    }
}

export default Repository