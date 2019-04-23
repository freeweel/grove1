import React from 'react';
import { CardResult, SearchView, SearchSnippet} from 'grove-core-react-components';

const CustomSearchResultContent = props => {
  return (
    <div>
      <p>Search Result:</p>
      <div className="ml-search-result-matches">
        {
          props.result.matches &&
            props.result.matches.map((match, index) => (
              <SearchSnippet match={match} key={index} />
            ))
        }
      </div>
    </div>
  )
};

const customNoResults =  () => (
  <p>Truly, there are no results.</p>
);

const CustomSearchResult = props => {
  // 1. Suppress the header, though you could change the header instead.
  // 2. Add 'You got a result!' to each result content using the above component.

  const propStr = () => JSON.stringify(props);
  const CardHeaderText = () => <div>Search Results</div>;

  return (
    <CardResult
      result={props.result}
      header={CardHeaderText}
      content={CustomSearchResultContent}
    >
    </CardResult>
  );
};


export default CustomSearchResult;