import tyde_home from './components/home/home.module';

describe('tyde', () => {

  describe('home.controller', () => {
    let controller;

    beforeEach(() => {
      angular.mock.module(tyde_home);

      angular.mock.inject(($controller) => {
        controller = $controller('home.controller', {});
      });
    });

    it('should contain the starter url', () => {
      expect(controller.url).toBe('https://github.com/Naquaduh/Tyde');
    });
  });
});