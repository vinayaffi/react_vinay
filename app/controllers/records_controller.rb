class RecordsController < ApplicationController
  def index
    @records = Record.all.order("created_at DESC")
  end

  def create
    puts request.headers['X-CSRF-Token'].inspect
    record = Record.new(record_params)

    if record.save
      render :json => record
    else
      render :json => record.errors, :status => :unprocessable_entity
    end
  end

  def update
    record = Record.find(params[:id])
    if record.update(record_params)
      render :json => record
    else
      render :json => record.errors, :status => :unprocessable_entity
    end
  end

  def destroy
    record = Record.find(params[:id])
    record.destroy
    head :no_content
  end

  private

  def record_params
    params.require(:record).permit(:title, :amount, :date)
  end
end
