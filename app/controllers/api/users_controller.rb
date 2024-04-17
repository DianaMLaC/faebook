class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    # @user = User.includes(albums: [:photos], posts: [:likes, comments => [:likes]]).find(params[:id])
    # change json to detail
    @user = User.find_by(id: params[:id])

    unless @user
      render json: { error: 'User not found' }, status: :not_found
      return
    end

    render :show
  end

  def create
    @user = User.new(
      first_name: params[:first_name],
      last_name: params[:last_name],
      password: params[:password],
      date_of_birth: params[:date_of_birth],
      email: params[:email]
    )

    if @user.save

      session[:auth_token] = @user.session_token
      render :create
    else
      # as per previous projects
      # render json: @user.errors.full_messages, status: 401
      mapped_errors = {
        email: @user.errors.where(:email).map(&:full_message).join(', '),
        firstName: @user.errors.where(:first_name).map(&:full_message).join(', '),
        lastName: @user.errors.where(:last_name).map(&:full_message).join(', '),
        password: @user.errors.where(:password).map(&:full_message).join(', '),
        dateOfBirth: @user.errors.where(:date_of_birth).map(&:full_message).join(', ')
      }

      # render :errors, status: 422

      render json: {
        errors: {
          user: omit_empty_strings(mapped_errors)
        }
      }, status: 422

    end
  end
end
