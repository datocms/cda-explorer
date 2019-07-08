import React, { useEffect, useState, useRef } from "react";
import GraphiQl from "graphiql";
import GraphiQLExplorer from "graphiql-explorer";
import { buildClientSchema } from "graphql";
import fetch from "./fetch";
import useQueryString from "./useQueryString";
import {
  introspectionQuery,
  introspectionQueryName
} from 'graphiql/dist/utility/introspectionQueries';

const Explorer = () => {
  const [queryString, setQueryString] = useQueryString();
  const [fetcher, setFetcher] = useState(() => () => {});
  const [schema, setSchema] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [explorerIsOpen, setExplorerIsOpen] = useState(true);
  const graphiql = useRef(null);

  useEffect(() => {
    let ignore = false;

    async function fetchSchema() {
      const newFetcher = fetch.bind(
        null,
        previewMode,
        queryString.apitoken
      );

      setFetcher(() => newFetcher);

      const result = await newFetcher({
        query: introspectionQuery,
        operationName: introspectionQueryName,
      });

      if (!ignore) {
        setSchema(buildClientSchema(result.data));
      }
    }

    fetchSchema();

    return () => {
      ignore = true;
    };
  }, [previewMode, queryString.apitoken]);

  return (
    <div className="graphiql-container">
      <GraphiQLExplorer
        schema={schema}
        query={queryString.query}
        onEdit={query => setQueryString({ query })}
        onRunOperation={operationName => {
          graphiql.current.handleRunQuery(operationName);
        }}
        explorerIsOpen={queryString.embed ? false : explorerIsOpen}
        onToggleExplorer={() => setExplorerIsOpen(!explorerIsOpen)}
      />
      <GraphiQl
        ref={graphiql}
        schema={schema}
        fetcher={fetcher}
        query={queryString.query}
        operationName={queryString.operationName}
        variables={queryString.variables}
        onEditQuery={query => setQueryString({ query })}
        onEditVariables={variables =>
          setQueryString({ variables })
        }
        onEditOperationName={operationName =>
          setQueryString({ operationName })
        }
      >
        <GraphiQl.Toolbar>
          <GraphiQl.Button
            onClick={() => setExplorerIsOpen(!explorerIsOpen)}
            title="Explorer"
            label="Explorer"
          />
          <GraphiQl.Button
            onClick={value => graphiql.current.handlePrettifyQuery()}
            title="Prettify Query (Shift-Ctrl-P)"
            label="Prettify"
          />
          <GraphiQl.Button
            onClick={value => graphiql.current.handleToggleHistory()}
            title="Show History"
            label="History"
          />
          <GraphiQl.Select
            onSelect={value => {
              setPreviewMode(value);
              graphiql.current.handleRunQuery();
            }}
          >
            <GraphiQl.SelectOption
              value={true}
              selected={previewMode}
              label="Use published content endpoint (https://graphql.datocms.com/)"
            />
            <GraphiQl.SelectOption
              value={false}
              selected={!previewMode}
              label="Use draft content endpoint (https://graphql.datocms.com/preview)"
            />
          </GraphiQl.Select>
        </GraphiQl.Toolbar>
      </GraphiQl>
    </div>
  );
};

export default Explorer;
