require "simple-spreadsheet"
require 'date'

class XlsParser
  def run(file_path)
    @file_path = file_path
    @result = {}
    parse_file
    @result
  end

  private

  def parse_file
    file.first_row.upto(file.last_row) do |line|
      parse_line(line)
    end
  end

  def parse_line(line)
    return unless valid_date?(file.cell(line, 1))
    actor = file.cell(line, 2)
    return if actor.gsub(/[^0-9a-z]/i, '') == 'IngapublikapositionerpubliceradesNopublicpositionswerepublished'
    company_name = file.cell(line, 3)

    company = company_name.split(" ").first.downcase

    company += company_name.split(" ")[1].downcase if company == 'swedish'

    amount = file.cell(line, 5).to_f
    amount = 0 if amount <= 0.5
    date = Date.parse(file.cell(line, 6).to_s)
    company(company, company_name, date)

    actor_key = actor.split(" ").first.downcase

    actor(company, actor_key, actor)[:positions][date.to_s] = amount
  end

  def actor(company_key, actor_key, actor = nil)
    company(company_key)[:actors][actor_key] = {
      name: actor,
      positions: {}
    } unless company(company_key)[:actors][actor_key]
    company(company_key)[:actors][actor_key]
  end

  def company(company_key, company_name = nil, date = nil)
    @result[company_key] = {
      name: company_name,
      lastChange: date,
      actors: {},
    } unless @result[company_key]
    @result[company_key][:lastChange] = date if date && @result[company_key][:lastChange] < date
    @result[company_key]
  end

  def file
    @file ||= SimpleSpreadsheet::Workbook.read(@file_path)
  end

  def valid_date?(date)
    date.is_a? Date
  end
end