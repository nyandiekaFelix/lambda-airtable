const Airtable = require('airtable');

const TABLE = 'Link Redirect';
const { AIRTABLE_API_KEY = '' } = process.env;
const { AIRTABLE_BASE = '' } = process.env;

const airtableClient = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE);

async function getLinkDetails(id) {
  const [url] = await airtableClient(TABLE).select({
      filterByFormula: `SEARCH("${id}", {Link:})`,
      fields: ['Link:', 'Redirects to:', 'Clicks:']
    }).all();

  if (!url) throw new Error('Record does not exist');

  return {
    id: url.getId(),
    link: url.fields['Link:'],
    redirect: url.fields['Redirects to:'] || '',
    clicks: url.fields['Clicks:']
  };
}

async function incrementClicks(details) {
  const count = parseInt(details.clicks, 10) + 1;

  const result = await airtableClient(TABLE).update([{
      id: details.id,
      'fields': { 'Clicks:': count }
    }]);

  return result;
}

exports.handler = async (event, context) => {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2));

  const { pathParameters: { uid } } = event;

  try {
    const {
      id = '',
      redirect = '',
      clicks = ''
    } = await getLinkDetails(uid);

    await incrementClicks({ id, clicks });

    const response = {
      statusCode: 302,
      headers: {
        Location: redirect,
      }
    };
    return response;
  } catch (error) {
    const errorResponse = {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
    console.log('[ERR]', errorResponse);
    return errorResponse;
  }

};
