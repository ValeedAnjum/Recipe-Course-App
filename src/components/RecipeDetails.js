import React, { Component } from 'react'
import {recipe} from '../tempDetails';
export default class RecipeDetails extends Component {
    state = {
        recipe:recipe,
        url:`https://www.food2fork.com/api/get?key=c12423a6160af8440415ce300fa47de2&rId=${this.props.id}`
    }
    async componentDidMount(){
      try {
            const data = await fetch(this.state.url);
            const jsonData = await data.json();
            this.setState({recipe: jsonData.recipe});
        } catch (err) {
            console.log(err);
        }
    }
    render() {
        const {image_url,publisher,publisher_url,source_url,title,ingredients} = this.state.recipe;
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className=" col-10 mx-auto col-md-6 my-3">
                            <button type="button"
                            onClick={() => this.props.handleIndex(1)}
                            className="btn btn-warning mb-5 text-capitalize">back to recipe list</button>
                            <img src={image_url} alt={title} className=" d-block w-100" />
                        </div>
                        {/* deatls sec */}
                        <div className="col-10 mx-auto col-md-6 my-3">
                            <h6 className=" text-uppercase">{title}</h6>
                            <h6 className="text-warning text-capitalize text-slanted">Provided by {publisher}</h6>
                            <a href={publisher_url} target="_blank"
                            className="btn btn-primary mt-2 text-capitalize"
                            rel="noopener noreferrer">publisher webpage</a>
                            <a href={source_url} target="_blank"
                            className="btn btn-primary mt-2 text-capitalize mx-3"
                            rel="noopener noreferrer">Recipe Url</a>
                            <ul className="list-group mt-4">
                                <h2 className=" mt-3 mb-4">ingredients</h2>
                                {
                                    ingredients.map((item,index) => {
                                        return (
                                            <li key={index} className="list-group-item text-slanted">
                                                {item}
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div>    
                </div>
            </React.Fragment>
        )
    }
}
