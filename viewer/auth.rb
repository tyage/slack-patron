require 'set'
require 'net/http'
require 'json'
require 'yaml'
require 'jwt'

# todo: global variable yameru

$config = YAML.load_file('./config.yml') # TODO: merge into one module

$allowed_emails = Set.new File.read('./secrets/emails.txt').split

def verify_keys
  uri = URI.parse("https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com")
  res = Net::HTTP.get_response(uri)

  # TODO: check max-age and cache

  JSON.parse(res.body)
end

def decode_token(token)
  begin
    keys = verify_keys

    notvalidated_data = JWT.decode token, nil, false
    if !keys.key? notvalidated_data[1]["kid"]
      "print unknown key"
      # key id is not known
      return nil
    end

    key = keys[notvalidated_data[1]["kid"]]
    if key === nil or key === ""
      print "key is nil"
      # nazeka key ga mu
      return nil
    end

    x509 = OpenSSL::X509::Certificate.new(key)

    user, header = JWT.decode token, x509.public_key, true, { algorithm: 'RS256' }

    # additional checks
    # https://firebase.google.com/docs/auth/admin/verify-id-tokens?hl=ja

    if $config["gcp_project_id"] === nil or $config["gcp_project_id"] === ""
      print "config gcp_project_id is empty"
      # nazeka empty config
      return nil
    end

    if not user["aud"] === $config["gcp_project_id"]
      print "aud is invalid"
      return nil
    end

    if not user["iss"] === "https://securetoken.google.com/" + $config["gcp_project_id"]
      print "iss is invalid"
      return nil
    end

    if user["sub"] === nil or user["sub"] === ""
      print "sub is nil"
      return nil
    end

    print "ok"

    return user
  rescue => e
    print "verify failed"
    print e
    return nil
  end
end

def auth(token)
  user = decode_token(token)

  if user === nil
    return false
  end

  user["email_verified"] === true and $allowed_emails.member? user["email"]
end
