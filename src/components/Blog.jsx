import React from 'react';

const Blog = () => {
  return (
    <div className="max-w-[700px] mx-auto py-12">
      <div className="shadow mb-8 p-4 rounded">
        <h2 className="capitalize text-2xl lg:text-4xl mb-4 font-bold">what is one way data binding?</h2>
        <p>In this case, changes in the data automatically update the UI, but changes in the UI do not automatically update the data. That's why it is referred to as one-way data binding. React achieves one-way data binding by using state and props.</p>
      </div>
      <div className="shadow mb-8 p-4 rounded">
        <h2 className="capitalize text-2xl lg:text-4xl mb-4 font-bold">what is npm in node js?</h2>
        <p>
          NPM is a package manager for Node.js packages, or modules if you like.{' '}
          <a href="https://www.npmjs.com" target="_blank">
            www.npmjs.com
          </a>{' '}
          hosts thousands of free packages to download and use.
        </p>
      </div>
      <div className="shadow mb-8 p-4 rounded">
        <h2 className="capitalize text-2xl lg:text-4xl mb-4 font-bold">difference between mongodb database and sql database.</h2>
        <p>SQL databases are used to store structured data while NoSQL databases like MongoDB are used to save unstructured data. MongoDB is used to save unstructured data in JSON format. MongoDB does not support advanced analytics and joins like SQL databases support.</p>
      </div>
    </div>
  );
};

export default Blog;
