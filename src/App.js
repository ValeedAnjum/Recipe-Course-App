import React, {Component} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import {recipes} from "./tempList";

class App extends Component {
    state = {
        Recipes: recipes,
        url: 'https://www.food2fork.com/api/search?key=c12423a6160af8440415ce300fa47de2',
        base_url:'https://www.food2fork.com/api/search?key=c12423a6160af8440415ce300fa47de2',
        query:"&q=",
        details_id: 35386,
        pageIndex: 1,
        search:"",
        error:""
    }
    handleChange = (e) => {
        this.setState({
            search:e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {base_url,query,search} = this.state;
        this.setState(() => {
            return {
                url:`${base_url}${query}${search}`,
                search:""
            }
        },() => {
            this.getRecipes();
        })
    }
    async getRecipes() {
        try {
            const data = await fetch(this.state.url);
            const jsonData = await data.json();
            if(jsonData.recipes.length === 0){
                this.setState(()=>{
                    return {
                        error:"Sorry,your search did not return any result"
                    }
                });
            }else{
                this.setState({Recipes: jsonData.recipes});
            }
        } catch (err) {
            console.log(err);
        }
    }
    // componentDidMount() {
    //     this.getRecipes();
    // }
    displayPage = (index) => {
        switch (index) {
            case 1:
                return (<RecipeList
                    error={this.state.error}
                    value={this.state.search}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    handleDetails={this.handleDetails}
                    recipes={this.state.Recipes}/>);
            case 0:
                return (<RecipeDetails
                    handleIndex={this.handleIndex}
                    id={this.state.details_id}/>);
        }
    }
    handleIndex = index => {
        this.setState({pageIndex: index})
    }
    handleDetails = (index, id) => {
        this.setState({pageIndex: index, details_id: id})
    }
    render() {
        return (
            <React.Fragment>
                {this.displayPage(this.state.pageIndex)}
            </React.Fragment>
        );
    }
}

export default App;
