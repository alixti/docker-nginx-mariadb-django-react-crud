from django.http import HttpResponse
# from django.shortcuts import redirect
# from django.urls import reverse
from urllib.parse import quote
    
# Don't add views here, create apps for that.
# This file is only to hold the reactLoader view
    
def reactLoader(request, path):
    # Typically, you would check if the user is authenticated here
    # But since the authentication check is commented out, we will skip it
    # We will be using Nginx's X-Accel-Redirect to serve the protected files
    
    # if request.user.is_authenticated:
        response = HttpResponse(status=200)
        response['Content-Type'] = ''
        response['X-Accel-Redirect'] = '@webapp'
        response['X-Accel-Redirect-Location'] = '/' + quote(path)
        return response
    # else:
    #    return redirect(reverse("login") + "?next=" + quote(path))

