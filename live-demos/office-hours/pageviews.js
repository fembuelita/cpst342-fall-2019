/**
 * Need to do:
 * - Add a new page view & timestamp
 * - list the page views & timestamps
 */

const pageViewsKeyName = "pageviews";

/**
 * Add the current page path + timestamp to the pageviews entry in local storage
 */
function addPageView() {
  /**
   * In order to add a page view,
   * we have to first check if there are any page views set
   * and if not, then we need to create the array first
   * afterward, or if the array already existed, we want to append to the array
   */
  let pageViews = localStorage.getItem(pageViewsKeyName);
  let arr = [];
  if (pageViews && pageViews.length > 0) {
    // get the array stored in local storage at pageViewsKeyName
    arr = JSON.parse(pageViews);
  }

  // now we're able to insert an item in the page view data
  let newPageData = {
    "path": window.location.pathname,
    "timestamp": moment()
  };

  // now add new page data to the array
  arr.push(newPageData);

  // finally, we want to update our storage with the most up to date array
  localStorage.setItem(pageViewsKeyName, arr);
}

function listPageViews() {

}