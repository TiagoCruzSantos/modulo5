import styled from 'styled-components'

export const Loading = styled.div`
    color: #FFF;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`
export const Owner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        color: #7159c1;
        font-size: 16px;
        text-decoration: none;
    }

    img {
        border-radius: 50%;
        width: 120px;
        margin-top: 20px;
    }

    h1 {
        font-size: 24px;
        margin-top: 10px;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        color: #666;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
    }

`

export const IssuesList = styled.ul`
    padding-top: 30px;
    margin-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;
        border: 1px solid #eee;
        border-radius: 4px;

        & + li {
            margin-top: 10px;
        }

        img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #eee;
        }

        div {
            flex: 1;
            margin-left: 15px;

            strong {
                font-size: 16px;

                a {
                    text-decoration: none;
                    color: #333;

                    &:hover{
                        color: #7159c1;
                    }
                }

                span {
                    background: #eee;
                    color: #333;
                    border-radius: 2px;
                    font-size: 12px;
                    font-weight: 600;
                    height: 20px;
                    padding: 2px 4px;
                    margin-left: 10px;
                }
            }

            p {
                margin-top: 5px;
                font-size: 12px;
                color: #999;
            }
        }

    }
`

export const Buttons = styled.div`

    display: flex;
    align-content: center;
    justify-content: center;

    button {
        background: #7159c1;
        border: 0;
        padding: 5px 15px;
        margin-left: 10px;
        border-radius: 4px;
        margin-bottom: 10px;

        justify-content: center;
        font-weight: bold;
        color: white;
    }
`

export const PageController = styled.div`
    justify-content: center;
    display:flex;
    margin-top: 10px;
    button {
        background: #7159c1;
        border: 0;
        padding: 0 15px;
        margin-left: 10px;
        border-radius: 4px;

        justify-content: center;
        align-items: center;
    }
`