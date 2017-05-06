import { requester } from 'requester';

class NotFound {
  constructor() { }

  loadNotFoundPage() {
    let notFoundPageMoviePath = './views/notFound-page.html';

    requester.get(notFoundPageMoviePath, 'text/html')
             .then((view) => {
               loadingScreen.finish();

               $('#main-content').html(view);
             });
  }
}

const notFoundController = new NotFound();

export { notFoundController };
