class Api::ChatsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :must_be_authorized
  before_action :set_chat_room, only: %i[show]

  # def index
  #   @chats = Chat.all
  #   render :index
  # end

  def show
    @chat = Chat.find(params[:id])
    debuger
    if @chat
      render :show
    else
      render json: { error: 'Unable to fetch chat' }, status: :unprocessable_entity
    end
  end

  def create
    recipient = User.find(params[:recipient_id])
    @chat = find_or_create_chat_between(@authenticated_user, recipient)

    if @chat
      render :show
    else
      render json: { error: 'Unable to create chat' }, status: :unprocessable_entity
    end
  end

  # def update
  #   if @chat.update(chat_params)
  #     render :show
  #   else
  #     render json: @chat.errors, status: :unprocessable_entity
  #   end
  # end

  # def destroy
  #   @chat.destroy
  #   head :no_content
  # end

  private

  def find_or_create_chat_between(user1, user2)
    chat = Chat.joins(:chat_subscriptions)
               .where(chat_subscriptions: { participant_id: [user1.id, user2.id] })
               .group(:id)
               .having('COUNT(chats.id) = 2')
               .first

    unless chat
      chat = Chat.create(name: "#{user2.display_name}")

      ChatSubscription.create(chat:, participant: user1)
      ChatSubscription.create(chat:, participant: user2)
    end

    chat
  end

  def set_chat_room
    @chat = Chat.find(params[:id])
  end

  # def chat_params
  #   params.require(:chat).permit(:name)
  # end
end
