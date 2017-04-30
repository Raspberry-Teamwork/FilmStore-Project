import { requester } from 'requester';

class NotFound {
  constructor() { }

  loadNotFoundPage() {
    requester.get('./views/notFound-page.html', 'text/html')
             .then((view) => {
               loadingScreen.finish();
               
               $('#main-content').html(view);
             });
  }
}

const notFoundController = new NotFound();

export { notFoundController };
