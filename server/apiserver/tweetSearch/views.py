from django.shortcuts import render
from django.http import HttpResponse
import json
import twitter

from . import keysInfo

api = twitter.Api(consumer_key=keysInfo.Consumer_key,
                  consumer_secret=keysInfo.Consumer_secret,
                  access_token_key=keysInfo.Access_token_key,
                  access_token_secret=keysInfo.Access_token_secret)


def getTweet(request):
    Count = request.GET.get('count', 10)
    # print(api.VerifyCredentials())    # credentials

    statuses = api.GetUserTimeline(screen_name=keysInfo.UserName, count=Count, include_rts=False, exclude_replies=True)

    tweetList = []
    # print(type(tweetList))
    for s in statuses:
        url = None
        if len(s.text.split("https://")) > 1:
            url = 'https://' + (s.text.split("https://"))[1]
        tweetList.append({'id': s.id, 'text': (s.text.split("https://"))[0], 'url': url})
        # print('place : ' + str(s.place) + '\n')
        # print('urls : ' + str(s.urls) + '\n')
        # print("text : " + str(s.text) + "\n")
        # print('----------------------------------------------')

    # status = api.GetStatus(status_id=statuses[0].id)
    # print(status.text)
    # print(status.full_text)

    response = json.dumps(tweetList)
    # print(statuses)
    # print(tweetList)
    # print(response)
    # print('----------------------------------------------')
    return HttpResponse(response, content_type = "application/json")