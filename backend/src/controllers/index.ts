import { AppController } from './app';
import { EventController } from './event';
import { FileController } from './file';
import { UserController } from './user';

interface Controllers {
  app: AppController;
  event: EventController;
  file: FileController;
  user: UserController;
}

const CreateControllers = (): Controllers => {
  const cont: Controllers = {
    app: new AppController(),
    event: new EventController(),
    file: new FileController(),
    user: new UserController(),
  };

  return cont;
};

export const controllers = CreateControllers();
