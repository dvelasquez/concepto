/**
 * Created by Danilo on 20/06/2015.
 */
angular.module('Home.Controllers')
    .controller('HomeController', function ($scope, $log, $state, $RestApi, $interval) {
        $scope.data = {
            counter: 0,
            cycles: 10,
            targetCycle: 0,
            isPaused: false,
            me: {
                exp: 0,
                hp: 20,
                currentHp: 20,
                dmg: 1
            },
            enemies: [
                {
                    id: 1,
                    hp: 10,
                    dmg: 1,
                    ias: 1 //attacks per 10/sec
                },
                {
                    id: 2,
                    hp: 15,
                    dmg: 2,
                    ias: 2 //attacks per 10/sec
                },
                {
                    id: 3,
                    hp: 3,
                    dmg: 3,
                    ias: 1 //attacks per 10/sec
                }
            ],
            currentEnemy: {
                id: 3,
                hp: 3,
                dmg: 1,
                ias: 7 //attacks per 10/sec
            }
        };

        //method to hit and pick a new adversary
        $scope.hitBox = function () {
            var current = $scope.data;
            //YOU CANT ATTACK IF YOU ARE DEAD!!!
            if ($scope.data.me.currentHp > 0) {
                //hit the enemy
                var hp = current.currentEnemy.hp;
                var dmg = current.me.dmg;
                hp = hp - dmg;
                $scope.data.currentEnemy.hp = hp;
                if (current.currentEnemy.hp <= 0) {
                    //pick a new enemy
                    var pickableEnemies = angular.copy(_.shuffle(current.enemies));
                    $scope.data.currentEnemy = pickableEnemies[0];
                }
                $scope.data.counter++;
            }
        };

        var hitBack = function () {
            var current = $scope.data;
            if((current.cycles%current.currentEnemy.ias) == 0){
                var hp = current.me.currentHp;
                var dmg = current.currentEnemy.dmg;
                $scope.data.me.currentHp = hp - dmg;
                $scope.data.targetCycle = current.cycles + 10;
            }
        };

        var regenerate = function () {
            //wait 10 cycles
            var current = $scope.data;
            if (current.targetCycle == current.cycles) {
                $scope.data.me.currentHp = current.me.hp;
            }
        };

        var intervalPromise = $interval(function () {
            $log.debug('ejecutado');
            var current = $scope.data;
            var hp = current.me.currentHp;
            current.cycles++;
            if (hp <= 0) {
                regenerate();
            } else {
                hitBack();
            }
        }, 1000);

        $scope.$on('$destroy', function () {
            $interval.cancel(intervalPromise);
        });

    });