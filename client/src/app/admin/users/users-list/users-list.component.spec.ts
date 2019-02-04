import { UsersListComponent } from './users-list.component';
import { of } from 'rxjs';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let USERS;
  let mockUserDataService;
  let mockNotificatorservice;
  
  beforeEach(() => {
    USERS = [
      {email: 'pesho@mail.com'},
      {email: 'gosho@mail.com'},
      {email: 'maria@mail.com'}
    ];

    mockUserDataService = jasmine.createSpyObj(['getAllUsers', 'deleteUser']);
    mockNotificatorservice = jasmine.createSpyObj(['success', 'error']);
    
    component = new UsersListComponent(mockUserDataService, mockNotificatorservice);
  });

  describe('deleteUser', () => {
    beforeEach(() => {
       mockUserDataService.deleteUser.and.returnValue(of(true));
      component.usersList = USERS;

    });

    it('should remove user from the users list', () => {
      // mockUserDataService.deleteUser.and.returnValue(of(true));
      // component.usersList = USERS;

      component.deleteUser(USERS[1]);

      expect(component.usersList.length).toBe(2);
      expect(component.usersList).not.toContain(USERS[1]);
      expect(component.usersList).toContain(USERS[0]);
    });

    it('userList should not contain the removed user', () => {
      component.deleteUser(USERS[1]);

      expect(component.usersList).not.toContain(USERS[1]);
    });

    it('should call usersService\'s deleteUser', () => {
      component.deleteUser(USERS[1]);

      expect(mockUserDataService.deleteUser).toHaveBeenCalled();
    });

    it('should call service deleteUser w/ the correct parameter', () => {
      component.deleteUser(USERS[1]);

      expect(mockUserDataService.deleteUser).toHaveBeenCalledWith(USERS[1]);
    });

  });
});