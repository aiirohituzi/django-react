from django.shortcuts import render
from django.http import HttpResponse

import twitter

from . import keysInfo

api = twitter.Api(consumer_key=keysInfo.Consumer_key,
                  consumer_secret=keysInfo.Consumer_secret,
                  access_token_key=keysInfo.Access_token_key,
                  access_token_secret=keysInfo.Access_token_secret)


def getTweet(request):
    # print(api.VerifyCredentials())    # credentials
    statuses = api.GetUserTimeline(screen_name=keysInfo.myUserName)
    for s in statuses:
        print(s.text + '\n')
    return HttpResponse('Hello')