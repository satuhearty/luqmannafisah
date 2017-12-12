import React, { Component } from 'react';
import Card from './Card';
import Masonry from 'react-masonry-component';
import MasonryInfiniteScroller from 'react-masonry-infinite';
import MasonryLayout from './MasonryLayout';

class Posts extends Component {
  state = {
    elements: [],
    hasMore: true,
    overlap: false,
    loading: false,
    count: 6,
    perPage: 10,
    items: Array(20).fill()
  };

  loadItems = () => {
    this.setState({
      items: this.state.items.concat(Array(this.state.perPage).fill())
    });
  };

  getCards = () => {
    if (this.state.loading) {
      return;
    }

    this.setState({ loading: true });
    console.log('Current count is :' + this.state.count);

    if (this.state.count <= 0 && this.state.overlap) {
      // this.setState({ hasMore: false, loading: false });
      // return;
    }

    if (this.state.count <= 0) {
      this.setState({ count: 6, overlap: true });
    }

    this.props.firebase.ref('posts').orderByKey().limitToLast(2).endAt(this.state.count.toString()).on('value', snapshot => {
      let posts = [];
      if (snapshot.numChildren() > 0) {
        snapshot.forEach(post => {
          posts.push({
            key: post.child('index').val(),
            author: post.child('author').val(),
            message: post.child('message').val(),
            upvote: post.child('upvote').val(),
            image: post.child('image').val()
          });
        });

        this.setState({
          elements: this.state.elements.concat(posts),
          count: this.state.count - 2,
          loading: false
        });
      } else {
        this.setState({ hasMore: false, loading: false });
      }
    });
  };

  render() {
    return (
      <MasonryLayout
        id="masonry"
        className="masonry"
        infiniteScroll={this.getCards}
        infiniteScrollLoading={this.state.loading}
        infiniteScrollEnd={!this.state.hasMore}
        infiniteScrollEndIndicator={null}
        infiniteScrollSpinner={null}
      >
        {this.state.elements.map(post => {
          return (
            <div className="card" key={post.key} >
              <Card
                post={post}
                firebase={this.props.firebase}
              />
            </div>
          );
        })}
        {/*{this.state.items.map((v, i) => {*/}
          {/*let height = i % 2 === 0 ? 200 : 100;*/}
          {/*return (*/}
            {/*<div*/}
              {/*key={i}*/}
              {/*style={{*/}
                {/*width: '100px',*/}
                {/*height: `${height}px`,*/}
                {/*lineHeight: `${height}px`,*/}
                {/*color: 'white',*/}
                {/*fontSize: '32px',*/}
                {/*display: 'block',*/}
                {/*background: 'rgba(0,0,0,0.7)'*/}
              {/*}}>*/}
              {/*{i}*/}
            {/*</div>*/}
          {/*)}*/}
        {/*)}*/}
      </MasonryLayout>
    );
  }
}

export default Posts;
