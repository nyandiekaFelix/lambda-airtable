const Airtable = require('airtable');

const TABLE = 'Link Redirect';
const { AIRTABLE_API_KEY = 'keyJSp2BUI1d4H4Ty' } = process.env;
const { AIRTABLE_BASE = 'appGCSG3T3Goy5EYP' } = process.env;

const airtableClient = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE);

async function saveLinks(links) {
  const result = await airtableClient(TABLE).create(links);
  return result
}

exports.handler = async (event, context) => {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2));

  const {
    range = 10,
    prefix = 'jira.zumvie.com',
    redirect = '',
    name = '',
  } = event;

  if (typeof range !== 'number') {
    console.error('Validation Failed');
    return new Error('Invalid Input');
  }

  const urls = [];

  for (let i = 0; i < range; i++) {
    const id = Math.random().toString(36).substring(3);
    const row = {
      'fields': {
        'Link:': `${prefix}/${id}`,
        'Redirects to:': redirect,
        'Name:': name,
        'Clicks:': 0
      }
    };
    urls.push(row);
  }

  try {
    const result = await saveLinks(urls);

    const response = {
      statusCode: 200,
      body: {
        message: `${range} urls generated and saved successfully`,
        records: result
      },
    };
    // console.log(response);
    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      body: {
        message: error.message,
        records: null
      },
    };
    console.log("[ERR]", response);
    return response;
  }
};
