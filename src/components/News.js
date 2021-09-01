import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 12,
    category: 'general',
    badgeColor: 'bg-primary',
  };

  static propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    badgeColor: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    // console.log('Hello i am a constructor from news component');
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=59b924dd524144228763cf7afe4e8e24&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
  }

  async componentDidMount() {
    // this.setState({ loading: true });
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=59b924dd524144228763cf7afe4e8e24&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // // console.log(parsedData);
    // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
    this.updateNews();
  }

  handlePrevClick = async () => {
    console.log('Previous');
    // let url = `
    // https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${
    //   this.props.category
    // }&apiKey=59b924dd524144228763cf7afe4e8e24&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // // console.log(parsedData);
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });

    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    console.log('Next');
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
    //   let url = `
    //     https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${
    //     this.props.category
    //   }&apiKey=59b924dd524144228763cf7afe4e8e24&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   // console.log(parsedData);
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }

    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{ margin: '30px 0' }}>
          NewsMonkey - Top {`${this.capitalizeFirstLetter(this.props.category)}`} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <div className='row'>
          {!this.state.loading &&
            this.state.articles.map((article) => {
              return (
                <div className='col-md-4' key={article.url}>
                  <NewsItem
                    newsUrl={article.url}
                    title={article.title || ''}
                    description={article.description || ''}
                    imageUrl={article.urlToImage}
                    author={article.author || 'Unknown'}
                    date={article.publishedAt}
                    source={article.source.name}
                    badgeColor={this.props.badgeColor}
                  />
                </div>
              );
            })}
        </div>

        <div className='container'>
          <div className='row'>
            <nav aria-label='Page navigation example'>
              <ul className='pagination justify-content-between'>
                <li className='page-item '>
                  <button
                    type='button'
                    disabled={this.state.page <= 1}
                    className='btn btn-sm btn-dark'
                    onClick={this.handlePrevClick}
                  >
                    &larr; Previous
                  </button>
                </li>

                <li className='page-item '>
                  <button
                    disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
                    type='button'
                    className='btn btn-sm btn-dark'
                    href='#'
                    onClick={this.handleNextClick}
                  >
                    Next &rarr;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}
