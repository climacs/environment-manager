/* Copyright (c) Trainline Limited, 2016. All rights reserved. See LICENSE.txt in the project root for license information. */
'use strict';

var should = require('should');

var DeploymentContract = require('modules/deployment/DeploymentContract');
var DeploymentKeyValueProvider = require('modules/deployment/DeploymentKeyValueProvider.class');

describe('DeploymentKeyValueProvider:', () => {

  it('Should be possible to get the deployment', () => {
    // Arrange
    var deployment = new DeploymentContract({
      id: '00000000-0000-0000-0000-000000000001',
      environmentName: 'pr1',
      environmentTypeName: 'Prod',
      serverRole: 'Web',
      serverRoleName: 'Web',
      serviceName: 'MyService',
      serviceVersion: '1.2.3',
      serviceSlice: '',
      clusterName: 'Tango',
      accountName: 'Prod',
      username: 'test-user',
    });

    // Act
    var target = new DeploymentKeyValueProvider();
    var promise = target.get(deployment);

    // Assert
    return promise.then(deployment => {
      should(deployment).not.be.undefined();

      deployment.key.should.be.equal('deployments/00000000-0000-0000-0000-000000000001/overall_status');
      deployment.value.should.be.equal('In Progress');
    });
  });

});
