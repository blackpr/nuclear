import React from 'react';
import { Tab } from 'semantic-ui-react';

import AllResults from './AllResults';
import Card from '../Card';

import styles from './styles.scss';

class SearchResults extends React.Component {

  renderAllResultsPane() {
    return (
      <Tab.Pane loading={this.props.unifiedSearchStarted} attached={false}>
        <div className={styles.pane_container}>
          <AllResults
            artistSearchResults={this.props.artistSearchResults}
            albumSearchResults={this.props.albumSearchResults}
          />
        </div>
      </Tab.Pane>
    );
  }

  renderPane(collection, onClick) {
    return (
      <Tab.Pane loading={this.props.unifiedSearchStarted} attached={false}>
        <div className={styles.pane_container}>
          {
            collection.length > 0
            ? this.props.unifiedSearchStarted
              ? null
              : collection.map((el, i) => {
                return (
                  <Card
                    header={el.title}
                    image={el.thumb}
                    onClick={() => onClick(el.id)}
                  />
                )
              })
            : 'Nothing found.'
          }
        </div>
      </Tab.Pane>
    );
  }

  panes() {
    var panes = [
      {
        menuItem: 'All',
        render: () => this.renderAllResultsPane()
      },
      {
        menuItem: 'Artists',
        render: () => this.renderPane(this.props.artistSearchResults, this.props.artistInfoSearch)
      },
      {
        menuItem: 'Albums',
        render: () => this.renderPane(this.props.albumSearchResults, this.props.albumInfoSearch)
      }
    ];

    return panes;
  }

  render() {
    return (
      <div>
        <Tab menu={{secondary: true, pointing: true}} panes={this.panes()} />
      </div>
    );
  }
}

export default SearchResults;