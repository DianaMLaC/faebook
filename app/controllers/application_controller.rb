class ApplicationController < ActionController::Base
  def omit_empty_strings(err_obj)
    err_obj.reject { |_k, _v| _v == '' }
  end
end
