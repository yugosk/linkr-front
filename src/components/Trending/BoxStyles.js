import styled from "styled-components";

export default styled.div`
margin:228px 20px 0px 25px;
width: 301px;
height: 406px;
background: #171717;
border-radius: 16px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
display:flex;
flex-direction:column;
padding: 9px 0px;
top:228px;

.trending{
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #FFFFFF;

    padding: 0px 16px 12px 16px;
    margin-bottom:12px;
    border-bottom:solid 1px #484848;
}

a,p{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 23px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
    padding: 8px 16px 0px 16px;
    
}
a:hover{
    cursor:pointer;
    text-decoration:underline;
}

a:nth-child(1){
    margin-top:20px;
}

@media (max-width: 612px) {
    display:none;
}
`
