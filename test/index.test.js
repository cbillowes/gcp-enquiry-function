// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

"use strict"

const proxyquire = require("proxyquire").noCallThru()
const sinon = require("sinon")
const assert = require("assert")

const getSample = () => {
  const requestPromise = sinon
    .stub()
    .returns(new Promise((resolve) => resolve("test")))

  return {
    sample: proxyquire("../", {
      "request-promise": requestPromise,
    }),
    mocks: {
      requestPromise: requestPromise,
    },
  }
}

const getMocks = () => {
  const req = {
    headers: {},
    get: function (header) {
      return this.headers[header]
    },
  }
  sinon.spy(req, "get")

  const corsPreflightReq = {
    method: "OPTIONS",
  }

  const corsMainReq = {
    method: "GET",
  }

  return {
    req: req,
    corsPreflightReq: corsPreflightReq,
    corsMainReq: corsMainReq,
    res: {
      set: sinon.stub().returnsThis(),
      send: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
      end: sinon.stub().returnsThis(),
      status: sinon.stub().returnsThis(),
    },
  }
}

const stubConsole = function () {
  sinon.stub(console, "error")
}

const restoreConsole = function () {
  console.error.restore()
}

beforeEach(stubConsole)
afterEach(restoreConsole)

describe("mailto", () => {
  it("send enquiry:fails data validation", () => {
    const mocks = getMocks()
    const httpSample = getSample()
    mocks.req.method = "POST"
    httpSample.sample.sendEmail(mocks.req, mocks.res)

    assert.strictEqual(mocks.res.status.calledOnce, true)
    assert.strictEqual(mocks.res.status.firstCall.args[0], 400)
    assert.strictEqual(mocks.res.send.calledOnce, true)
    assert.strictEqual(mocks.res.send.firstCall.args[0], "No data has been provided.")
  })

  it("send enquiry", () => {
    const mocks = getMocks()
    const httpSample = getSample()
    mocks.req.method = "POST"
    mocks.req.body = {
      name: "John",
      email: "john@op.com",
      enquiry: "I want more papayas.",
    }
    httpSample.sample.sendEmail(mocks.req, mocks.res)

    assert.strictEqual(mocks.res.status.calledOnce, true)
    assert.strictEqual(mocks.res.status.firstCall.args[0], 200)
    assert.strictEqual(mocks.res.send.calledOnce, true)
    assert.strictEqual(mocks.res.send.firstCall.args[0], "Enquiry sent.")
  })
})
