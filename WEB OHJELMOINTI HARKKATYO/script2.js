

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: 'Helsinki'}
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    this.setState({value: event.target.value,});
  }

    render() {

      return (
  
        <div>

          <form>
            <label>
                Valitse Kaupunki <br />
                <select value={this.state.value} onChange={this.handleChange}>
                    <option value="Helsinki">Helsinki</option>
                    <option value="Tampere">Tampere</option>
                    <option value="Jyväskylä">Jyväskylä</option>
                    <option value="Kuopio">Kuopio</option>
                    <option value="Turku">Turku</option>
                    <option value="Oulu">Oulu</option>
                </select><br />
            </label>  
          </form>


          <div className="valittu">
            <span>{this.state.value}</span> <br />
            {this.state.value == 'Helsinki'? <img src={"kuvat/helsinki.jpg"} />: null }
            {this.state.value == 'Tampere'? <img src={"kuvat/tampere.jpg"} />: null }
            {this.state.value == 'Jyväskylä'? <img src={"kuvat/jyvaskyla.jpg"} />: null }
            {this.state.value == 'Kuopio'? <img src={"kuvat/kuopio.jpg"} />: null }
            {this.state.value == 'Turku'? <img src={"kuvat/turku.jpg"} />: null }
            {this.state.value == 'Oulu'? <img src={"kuvat/oulu.jpg"} />: null }
          </div>
   
        </div>

      );
    }
  }

ReactDOM.render(
    <App />,
    document.getElementById("sovellus")
);